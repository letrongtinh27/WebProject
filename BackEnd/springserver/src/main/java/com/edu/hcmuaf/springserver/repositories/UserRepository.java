package com.edu.hcmuaf.springserver.repositories;

import com.edu.hcmuaf.springserver.entity.Movie;
import com.edu.hcmuaf.springserver.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
