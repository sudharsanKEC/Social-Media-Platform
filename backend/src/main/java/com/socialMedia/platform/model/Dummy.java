package com.socialMedia.platform.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "dummy")
public class Dummy {

    @Id
    private String id;
    private String name;

    public Dummy(){}

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Dummy(String name) {
//        this.id = id;
        this.name = name;
    }
}
