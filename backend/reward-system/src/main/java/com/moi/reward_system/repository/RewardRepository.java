package com.moi.reward_system.repository;

import com.moi.reward_system.entity.Reward;
import com.moi.reward_system.entity.RewardCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface RewardRepository extends JpaRepository<Reward, Long> {

    @Query("""
        SELECT COUNT(r) FROM Reward r
        WHERE r.employee.id = :employeeId
        AND r.dateAwarded BETWEEN :start AND :end
    """)
    long countRewardsForMonth(
            @Param("employeeId") Long employeeId,
            @Param("start") LocalDate start,
            @Param("end") LocalDate end
    );

    boolean existsByEmployeeIdAndRewardNameAndDateAwarded(
            Long employeeId,
            String rewardName,
            LocalDate dateAwarded
    );

    List<Reward> findByCategory(RewardCategory category);

    List<Reward> findByEmployeeId(Long employeeId);

    List<Reward> findByCategoryAndEmployeeId(
            RewardCategory category,
            Long employeeId
    );
}


