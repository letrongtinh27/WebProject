package com.edu.hcmuaf.springserver.repositories;

import com.edu.hcmuaf.springserver.dto.SeatResponse;
import com.edu.hcmuaf.springserver.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface SeatRepository extends JpaRepository<Seat, Long> {
    @Query("SELECT new com.edu.hcmuaf.springserver.dto.SeatResponse(s.id, CONCAT(s.row_char, s.seat_number), "
            + "(CASE WHEN r.id IS NOT NULL THEN true ELSE false END)) "
            + "FROM Seat s LEFT JOIN Reservation r ON s.id = r.seat_id AND r.show_time_id = :showTimeId "
            + "WHERE s.theatre_id = :theatreId AND s.room = :room")
    List<SeatResponse> findSeatsByShowTimeAndTheatre(@Param("showTimeId") int showTimeId, @Param("theatreId") int theatreId, @Param("room") int room);
}
