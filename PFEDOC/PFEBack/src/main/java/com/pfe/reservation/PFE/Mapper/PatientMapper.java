package com.pfe.reservation.PFE.Mapper;

import com.pfe.reservation.PFE.DTO.PatientDTO;
import com.pfe.reservation.PFE.Model.Patient;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface PatientMapper {

    PatientDTO.Output toOutput(Patient entity);

    Patient toEntity(PatientDTO.CreateInput input);

    void updateEntityFromDto(PatientDTO.UpdateInput input, @MappingTarget Patient entity);
}