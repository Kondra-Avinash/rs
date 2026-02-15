package com.moi.reward_system.controller;

import com.moi.reward_system.dto.RewardDTO;
import com.moi.reward_system.service.RewardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import com.moi.reward_system.entity.RewardCategory;


@RestController
@RequestMapping("/api/rewards")
@RequiredArgsConstructor
public class RewardController {

    private final RewardService service;

    @PostMapping
    public RewardDTO assign(@RequestBody RewardDTO dto) {
        return service.assignReward(dto);
    }

    @GetMapping
    public List<RewardDTO> all(
            @RequestParam(required = false) RewardCategory category,
            @RequestParam(required = false) Long employeeId
    ) {
        return service.getAllRewards(category, employeeId);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteReward(id);
    }

    @PutMapping("/{id}")
    public RewardDTO update(
            @PathVariable Long id,
            @RequestBody RewardDTO dto
    ) {
        return service.updateReward(id, dto);
    }

    @GetMapping("/{id}")
    public RewardDTO getById(@PathVariable Long id) {
        return service.getById(id);
    }


}