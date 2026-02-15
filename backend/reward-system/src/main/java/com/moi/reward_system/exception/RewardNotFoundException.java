package com.moi.reward_system.exception;

public class RewardNotFoundException extends RuntimeException {

    public RewardNotFoundException(Long id) {
        super("Reward not found with id: " + id);
    }
}
