package com.example.javaservice.repository;

import com.example.javaservice.model.EventSummary;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface EventSummaryRepository extends MongoRepository<EventSummary, String> {
    Optional<EventSummary> findByEventType(String eventType);
}