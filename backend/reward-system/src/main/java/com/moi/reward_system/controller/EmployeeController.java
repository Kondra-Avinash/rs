package com.moi.reward_system.controller;

import com.moi.reward_system.dto.EmployeeDTO;
import com.moi.reward_system.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.data.domain.Page;


@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service){
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<EmployeeDTO> create(@RequestBody @Valid EmployeeDTO dto){
        return ResponseEntity.ok(service.create(dto));
    }

    @GetMapping
    public Page<EmployeeDTO> all(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(required = false) String department
    ) {
        return service.getAll(page, size, sortBy, direction, department);
    }


    @PutMapping("/{id}")
    public EmployeeDTO update(@PathVariable Long id,@RequestBody EmployeeDTO dto){
        return service.update(id,dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){

        service.delete(id);
    }

    @GetMapping("/all")
    public List<EmployeeDTO> getAllEmployeesSimple() {
        return service.getAllEmployeesSimple();
    }

}