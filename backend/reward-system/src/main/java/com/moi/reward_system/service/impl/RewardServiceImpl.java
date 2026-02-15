package com.moi.reward_system.service.impl;

import com.moi.reward_system.dto.RewardDTO;
import com.moi.reward_system.entity.Reward;
import com.moi.reward_system.entity.Employee;
import com.moi.reward_system.entity.RewardCategory;
import com.moi.reward_system.exception.DuplicateRewardException;
import com.moi.reward_system.exception.EmployeeNotFoundException;
import com.moi.reward_system.repository.RewardRepository;
import com.moi.reward_system.repository.EmployeeRepository;
import com.moi.reward_system.service.RewardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.moi.reward_system.exception.RewardNotFoundException;
import java.time.LocalDate;
import com.moi.reward_system.exception.RewardLimitExceededException;


import java.util.List;

@Service
@RequiredArgsConstructor
public class RewardServiceImpl implements RewardService {

    private final RewardRepository rewardRepo;
    private final EmployeeRepository employeeRepo;  // need this to fetch employee

    @Override
    public RewardDTO assignReward(RewardDTO dto) {

        // 1️⃣ Fetch employee
        Employee emp = employeeRepo.findById(dto.getEmployeeId())
                .orElseThrow(() -> new EmployeeNotFoundException(dto.getEmployeeId()));

        // 2️⃣ 🔥 Duplicate Reward Prevention
        boolean alreadyExists = rewardRepo
                .existsByEmployeeIdAndRewardNameAndDateAwarded(
                        dto.getEmployeeId(),
                        dto.getRewardName(),
                        dto.getDateAwarded()
                );

        if (alreadyExists) {
            throw new DuplicateRewardException(
                    "This reward is already assigned to the employee on this date"
            );
        }

        // 3️⃣ 🔥 Monthly Limit Rule
        LocalDate date = dto.getDateAwarded();
        LocalDate startOfMonth = date.withDayOfMonth(1);
        LocalDate endOfMonth = date.withDayOfMonth(date.lengthOfMonth());

        long rewardCount = rewardRepo.countRewardsForMonth(
                dto.getEmployeeId(),
                startOfMonth,
                endOfMonth
        );

        if (rewardCount >= 3) {
            throw new RewardLimitExceededException(
                    "Employee cannot receive more than 3 rewards in a month"
            );
        }

        // 4️⃣ Save reward
        Reward reward = Reward.builder()
                .employee(emp)
                .rewardName(dto.getRewardName())
                .dateAwarded(dto.getDateAwarded())
                .category(dto.getCategory())
                .build();

        Reward saved = rewardRepo.save(reward);

        RewardDTO response = new RewardDTO();
        response.setId(saved.getId());
        response.setEmployeeId(saved.getEmployee().getId());
        response.setRewardName(saved.getRewardName());
        response.setDateAwarded(saved.getDateAwarded());

        System.out.println("EmployeeId: " + dto.getEmployeeId());
        System.out.println("RewardName: " + dto.getRewardName());
        System.out.println("DateAwarded: " + dto.getDateAwarded());


        return response;
    }


    @Override
    public List<RewardDTO> getAllRewards(
            RewardCategory category,
            Long employeeId
    ) {

        List<Reward> rewards;

        if (category != null && employeeId != null) {
            rewards = rewardRepo.findByCategoryAndEmployeeId(category, employeeId);
        } else if (category != null) {
            rewards = rewardRepo.findByCategory(category);
        } else if (employeeId != null) {
            rewards = rewardRepo.findByEmployeeId(employeeId);
        } else {
            rewards = rewardRepo.findAll();
        }

        return rewards.stream().map(r -> {
            RewardDTO dto = new RewardDTO();
            dto.setId(r.getId());
            dto.setEmployeeId(r.getEmployee().getId());
            dto.setRewardName(r.getRewardName());
            dto.setDateAwarded(r.getDateAwarded());
            dto.setCategory(r.getCategory());
            return dto;
        }).toList();
    }


    @Override
    public void deleteReward(Long id) {

        if (!rewardRepo.existsById(id)) {
            throw new RewardNotFoundException(id);
        }

        rewardRepo.deleteById(id);
    }
}