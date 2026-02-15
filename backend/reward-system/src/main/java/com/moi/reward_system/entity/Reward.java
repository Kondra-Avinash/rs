package com.moi.reward_system.entity;

import com.moi.reward_system.audit.Auditable;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reward extends Auditable {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String rewardName;

    private LocalDate dateAwarded;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RewardCategory category;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="employee_id", nullable = false)
    private Employee employee;


}