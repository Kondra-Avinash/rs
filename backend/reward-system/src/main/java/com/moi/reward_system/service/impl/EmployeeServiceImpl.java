package com.moi.reward_system.service.impl;

import com.moi.reward_system.dto.EmployeeDTO;
import com.moi.reward_system.entity.Employee;
import com.moi.reward_system.repository.EmployeeRepository;
import com.moi.reward_system.service.EmployeeService;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import com.moi.reward_system.exception.EmployeeNotFoundException;




import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository repo;

    public EmployeeDTO create(EmployeeDTO dto){
        log.info("Creating employee with email {}", dto.getEmail());
        Employee emp = Employee.builder()
                .name(dto.getName())
                .department(dto.getDepartment())
                .email(dto.getEmail())
                .build();

        return map(repo.save(emp));
    }

    @Override
    public Page<EmployeeDTO> getAll(
            int page,
            int size,
            String sortBy,
            String direction,
            String department
    ) {

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        PageRequest pageable = PageRequest.of(page, size, sort);

        Page<Employee> result;

        if (department != null && !department.isBlank()) {
            result = repo.findByDepartment(department, pageable);
        } else {
            result = repo.findAll(pageable);
        }

        return result.map(this::map);
    }



    public EmployeeDTO update(Long id, EmployeeDTO dto){
        log.info("Updating employee with id {}", id);
        Employee emp = repo.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(id));

        emp.setName(dto.getName());
        emp.setDepartment(dto.getDepartment());
        emp.setEmail(dto.getEmail());

        return map(repo.save(emp));
    }

    public void delete(Long id){
        log.info("Deleting employee with id {}", id);
        if (!repo.existsById(id)) {
            throw new EmployeeNotFoundException(id);
        }

        repo.deleteById(id);
    }

    private EmployeeDTO map(Employee e){
        EmployeeDTO dto = new EmployeeDTO();
        BeanUtils.copyProperties(e,dto);
        return dto;
    }

    @Override
    public List<EmployeeDTO> getAllEmployeesSimple() {
        return repo.findAll(Sort.by("name").ascending())
                .stream()
                .map(this::map)
                .toList();
    }

}