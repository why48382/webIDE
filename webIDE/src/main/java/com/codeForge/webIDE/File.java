package com.codeForge.webIDE;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Getter
@Setter
@Entity
@ToString
public class File {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    public String data;

}