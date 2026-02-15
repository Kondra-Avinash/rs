package com.moi.reward_system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAwareImpl")
public class RewardSystemApplication {

	public static void main(String[] args) {

		SpringApplication.run(RewardSystemApplication.class, args);
	}

}
