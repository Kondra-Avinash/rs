package com.moi.reward_system.service;

import com.moi.reward_system.dto.EmployeeDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface EmployeeService {
    EmployeeDTO create(EmployeeDTO dto);
    Page<EmployeeDTO> getAll(
            int page,
            int size,
            String sortBy,
            String direction,
            String department
    );

    EmployeeDTO update(Long id, EmployeeDTO dto);
    void delete(Long id);

    List<EmployeeDTO> getAllEmployeesSimple();

}
