package com.example.javaservice.model;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "summaries")
public class EventSummary {

    @Id
    private String id;

    private String eventType;
    private Long count;
    private Double avgLatency;
    private Instant lastUpdated;
}