package com.example.javaservice.repository;

import com.example.javaservice.model.NetworkEvent;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.time.Instant;
import java.util.List;

public interface NetworkEventRepository extends MongoRepository<NetworkEvent, String> {

    @Query("{ $and: [ " +
            "{ $or: [ { 'type': ?0 }, { $expr: { $eq: [?0, null] } } ] }, " +
            "{ $or: [ { 'severity': ?1 }, { $expr: { $eq: [?1, null] } } ] }, " +
            "{ $or: [ { 'timestamp': { $gte: ?2 } }, { $expr: { $eq: [?2, null] } } ] }, " +
            "{ $or: [ { 'timestamp': { $lte: ?3 } }, { $expr: { $eq: [?3, null] } } ] } " +
            "] }")
    List<NetworkEvent> findByFilters(String type, String severity, Instant from, Instant to);
}