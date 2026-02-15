package com.moi.reward_system.dto;

import com.moi.reward_system.entity.RewardCategory;
import lombok.Data;

import java.time.LocalDate;

@Data
public class RewardDTO {
    private Long id;
    private Long employeeId;
    private String rewardName;
    private LocalDate dateAwarded;
    private RewardCategory category;
}
