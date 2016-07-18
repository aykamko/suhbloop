# rubocop:disable all
#
# Implementation of Crowd-BT
# Source: http://people.stern.nyu.edu/xchen3/images/crowd_pairwise.pdf
module CrowdBT
  K = 0.0001

  # See 4.1 Online Learning for implementation details
  def update(mu_i, mu_j, sigmasq_i, sigmasq_j, alpha, beta)
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
    new_sigmasq_i = sigmasq_i * max(1 + sigmasq_i * t, K)
    new_sigmasq_j = sigmasq_j * max(1 + sigmasq_j * t, K)

    # alpha, beta update
    c1 = emu_i / emu_i_plus_emu_j + \
      0.5 * (sigma_sq_i * sigma_sq_j) * (emu_i * emu_j * (emu_j - emu_i)) / emu_i_plus_emu_j**3
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

    [new_mu_i, new_mu_j, new_sigmasq_i, new_sigmasq_j, new_alpha, new_beta]
  end
end
