package com.moi.reward_system.service;

import com.moi.reward_system.dto.RewardDTO;
import com.moi.reward_system.entity.RewardCategory;

import java.util.List;

public interface RewardService {

    RewardDTO assignReward(RewardDTO dto);      // <-- add this
    List<RewardDTO> getAllRewards(
            RewardCategory category,
            Long employeeId
    );

    void deleteReward(Long id);

    RewardDTO updateReward(Long id, RewardDTO dto);

    RewardDTO getById(Long id);


}