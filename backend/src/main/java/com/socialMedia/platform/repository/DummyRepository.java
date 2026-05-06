package com.socialMedia.platform.repository;


import com.socialMedia.platform.model.Dummy;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DummyRepository extends MongoRepository<Dummy, String> {

}
