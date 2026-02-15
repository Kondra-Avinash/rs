package com.moi.reward_system.audit;

import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AuditorAwareImpl implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        // Later this can come from SecurityContext
        return Optional.of("SYSTEM_ADMIN");
    }
}
