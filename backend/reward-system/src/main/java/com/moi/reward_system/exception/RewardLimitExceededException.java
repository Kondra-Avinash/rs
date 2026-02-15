package com.moi.reward_system.exception;

public class RewardLimitExceededException extends RuntimeException {
    public RewardLimitExceededException(String message) {
        super(message);
    }
}
