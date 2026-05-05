package com.example.javaservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import java.util.Map;

@Data
public class EventRequest {

    @NotBlank
    @Pattern(regexp = "connection|disconnection|error|alert|traffic")
    private String type;

    @NotBlank
    @Pattern(regexp = "low|medium|high|critical")
    private String severity;

    @NotBlank
    private String sourceIp;

    @PositiveOrZero
    private Double latency = 0.0;

    private Map<String, Object> metadata;
}