# rubocop:disable all
require 'gsl'
require 'distribution'

# Implementation of Crowd-BT
# Source: http://people.stern.nyu.edu/xchen3/images/crowd_pairwise.pdf
module CrowdBT
  K = 0.0001
  GAMMA = 0
  EPSILON = 0.25

  # See 4.1 Online Learning for implementation details
  module_function def update(mu_i, mu_j, sigmasq_i, sigmasq_j, alpha, beta)
    emu_i = Math.exp(mu_i)
    emu_j = Math.exp(mu_j)
    alpha_emui = alpha * emu_i
    beta_emuj = beta * emu_j
    alpha_emui_plus_beta_emu_j = alpha_emui + beta_emuj
    emu_i_plus_emu_j = emu_i + emu_j

    # mu update
    t = (alpha_emui / alpha_emui_plus_beta_emu_j - emu_i / emu_i_plus_emu_j)
    new_mu_i = mu_i + sigmasq_i * t
    new_mu_j = mu_j - sigmasq_j * t

    # sigma update
    t = (alpha_emui * beta_emuj) / alpha_emui_plus_beta_emu_j**2 - (emu_i * emu_j) / emu_i_plus_emu_j**2
    new_sigmasq_i = sigmasq_i * [1 + sigmasq_i * t, K].max
    new_sigmasq_j = sigmasq_j * [1 + sigmasq_j * t, K].max

    # alpha, beta update
    c1 = emu_i / emu_i_plus_emu_j + \
      0.5 * (sigmasq_i * sigmasq_j) * (emu_i * emu_j * (emu_j - emu_i)) / emu_i_plus_emu_j**3
    c2 = 1 - c1
    c = (c1 * alpha + c2 * beta) / (alpha + beta)

    m1_eta_n1 = c1 * (alpha + 1) * alpha
    m1_eta_n2 = c2 * alpha * beta
    m1_eta_d = c * (alpha + beta + 1) * (alpha + beta)

    m1_eta = (m1_eta_n1 + m1_eta_n2) / m1_eta_d
    m2_eta = (m1_eta_n1 * (alpha + 2) + m1_eta_n2 * (alpha + 1)) / (m1_eta_d * (alpha + beta + 2))

    t = (m1_eta - m2_eta) / (m2_eta - m1_eta**2)
    new_alpha = t * m1_eta
    new_beta = t * (1 - m1_eta)

    [new_mu_i, new_mu_j, new_sigmasq_i, new_sigmasq_j, new_alpha, new_beta, c]
  end

  # Source: https://www.wikiwand.com/en/Beta_distribution
  module_function def divergence_beta(alpha, beta, alpha_1, beta_1)
    (Math.logbeta(alpha_1, beta_1) - Math.logbeta(alpha, beta)) \
      + (alpha - alpha_1) * GSL::Sf::psi(alpha) \
      + (beta - beta_1) * GSL::Sf::psi(beta) \
      + (alpha_1 - alpha + beta_1 - beta) * GSL::Sf::psi(alpha + beta)
  end

  # Source: https://www.wikiwand.com/en/Normal_distribution
  module_function def divergence_normal(mu_1, sigmasq_1, mu_2, sigmasq_2)
    (mu_1 - mu_2)**2 / (2 * sigmasq_2) \
      + 0.5 * (sigmasq_1 / sigmasq_2 - 1 - Math.log(sigmasq_1 / sigmasq_2))
  end

  module_function def information_gain(mu_i, sigmasq_i, mu_j, sigmasq_j, alpha, beta)
    iwins_mu_i, iwins_mu_j, iwins_sigmasq_i, iwins_sigmasq_j, iwins_alpha, iwins_beta, iwins_c = \
      update(mu_i, mu_j, sigmasq_i, sigmasq_j, alpha, beta)
    jwins_mu_i, jwins_mu_j, jwins_sigmasq_i, jwins_sigmasq_j, jwins_alpha, jwins_beta, jwins_c = \
      update(mu_j, mu_i, sigmasq_j, sigmasq_i, alpha, beta)

    iwins_c * (divergence_normal(iwins_mu_i, iwins_sigmasq_i, mu_i, sigmasq_i) \
               + divergence_normal(iwins_mu_j, iwins_sigmasq_j, mu_j, sigmasq_j) \
               + GAMMA * divergence_beta(iwins_alpha, iwins_beta, alpha, beta)) \
    + jwins_c * (divergence_normal(jwins_mu_i, jwins_sigmasq_i, mu_i, sigmasq_i) \
               + divergence_normal(jwins_mu_j, jwins_sigmasq_j, mu_j, sigmasq_j) \
               + GAMMA * divergence_beta(jwins_alpha, jwins_beta, alpha, beta))
  end
end
