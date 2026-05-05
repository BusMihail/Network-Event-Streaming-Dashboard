package com.example.javaservice.model;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;
import java.util.Map;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "events")
public class NetworkEvent {

    @Id
    private String id;

    private String type;
    private String severity;
    private String sourceIp;
    private Double latency;

    @CreatedDate
    private Instant timestamp;

    private Map<String, Object> metadata;
}
