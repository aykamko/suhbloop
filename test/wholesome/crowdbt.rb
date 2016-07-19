# rubocop:disable all
require 'test_helper'
require "#{Rails.root}/lib/crowdbt"

class CrowdBTTest < ActionDispatch::IntegrationTest
  class RankedObject
    attr_accessor :rank, :mu, :sigmasq, :new
  end

  class Reviewer
    attr_accessor :alpha, :beta, :prev_obj
  end

  def calc_accuracy(derived_order)
    total_pairs = 0.0
    correct_pairs = 0.0
    299.downto(0).each do |i|
      (i - 1).downto(0).each do |j|
        c = (derived_order[i].rank > derived_order[j].rank) && (i > j)
        correct_pairs += 1.0 if c
        total_pairs += 1.0
      end
    end

    correct_pairs / total_pairs
  end

  test 'accurcy of CrowdBT with Blueprint review-like conditions' do
    objects = []
    (1..300).each do |i|
      obj = RankedObject.new
      obj.rank = i
      obj.mu = 0.0
      obj.sigmasq = 1.0
      obj.new = true

      objects << obj
    end

    reviewers = []
    (1..10).each do
      r = Reviewer.new
      r.alpha = 10
      r.beta = 1
      r.prev_obj = objects.sample
      r.prev_obj.new = false
      reviewers << r
    end

    ratings = 1000
    ratings.times do |i|
      r = reviewers[i % reviewers.length]
      prev_obj = r.prev_obj

      new_objects = objects.select(&:new)
      if !new_objects.empty?
        next_obj = new_objects.sample
      else
        info_gains = objects.map do |o|
          CrowdBT.information_gain(o.mu, o.sigmasq,
                                   prev_obj.mu, prev_obj.sigmasq,
                                   r.alpha, r.beta)
        end
        next_obj = objects[info_gains.each_with_index.max[1]]
      end

      if next_obj.rank > prev_obj.rank
        new_mu_i, new_mu_j, new_sigmasq_i, new_sigmasq_j, new_alpha, new_beta, = \
          CrowdBT.update(next_obj.mu, prev_obj.mu, next_obj.sigmasq, prev_obj.sigmasq, r.alpha, r.beta)
      else
        new_mu_i, new_mu_j, new_sigmasq_i, new_sigmasq_j, new_alpha, new_beta, = \
          CrowdBT.update(prev_obj.mu, next_obj.mu, prev_obj.sigmasq, next_obj.sigmasq, r.alpha, r.beta)
      end

      next_obj.mu = new_mu_i
      prev_obj.mu = new_mu_j
      next_obj.sigmasq = new_sigmasq_i
      prev_obj.sigmasq = new_sigmasq_j
      r.alpha = new_alpha
      r.beta = new_beta
      r.prev_obj = next_obj
      next_obj.new = false
      prev_obj.new = false

      puts i
    end

    derived_order = objects.sort_by(&:mu).reverse!
    accuracy = calc_accuracy(derived_order)
    puts "#{ratings} pairs, accuracy: #{accuracy}"
  end
end
