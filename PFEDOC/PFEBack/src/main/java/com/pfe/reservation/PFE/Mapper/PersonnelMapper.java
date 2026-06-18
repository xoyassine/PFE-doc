package com.pfe.reservation.PFE.Mapper;

import com.pfe.reservation.PFE.DTO.PersonnelDTO;
import com.pfe.reservation.PFE.Model.Personnel;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface PersonnelMapper {

    PersonnelDTO.Output toOutput(Personnel entity);

    Personnel toEntity(PersonnelDTO.CreateInput input);

    void updateEntityFromDto(PersonnelDTO.UpdateInput input, @MappingTarget Personnel entity);
}