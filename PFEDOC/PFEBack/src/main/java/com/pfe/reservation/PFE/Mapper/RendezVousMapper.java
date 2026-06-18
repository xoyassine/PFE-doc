package com.pfe.reservation.PFE.Mapper;

import com.pfe.reservation.PFE.DTO.RendezVousDTO;
import com.pfe.reservation.PFE.Model.Patient;
import com.pfe.reservation.PFE.Model.Personnel;
import com.pfe.reservation.PFE.Model.RendezVous;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface RendezVousMapper {

    @Mapping(source = "patient.idPatient", target = "patientId")
    @Mapping(source = "patient.nom", target = "patientNom")
    @Mapping(source = "personnel.idPer", target = "personnelId")
    @Mapping(source = "personnel.nom", target = "personnelNom")
    RendezVousDTO.Output toOutput(RendezVous entity);

    @Mapping(target = "idRdv", ignore = true)
    @Mapping(target = "patient", source = "patientId", qualifiedByName = "patientFromId")
    @Mapping(target = "personnel", source = "personnelId", qualifiedByName = "personnelFromId")
    RendezVous toEntity(RendezVousDTO.CreateInput input);

    @Mapping(target = "idRdv", ignore = true)
    @Mapping(target = "patient", source = "patientId", qualifiedByName = "patientFromId", conditionExpression = "java(input.getPatientId() != null)")
    @Mapping(target = "personnel", source = "personnelId", qualifiedByName = "personnelFromId", conditionExpression = "java(input.getPersonnelId() != null)")
    void updateEntityFromDto(RendezVousDTO.UpdateInput input, @MappingTarget RendezVous entity);

    @Named("patientFromId")
    default Patient patientFromId(Long id) {
        if (id == null) return null;
        Patient p = new Patient();
        p.setIdPatient(id);
        return p;
    }

    @Named("personnelFromId")
    default Personnel personnelFromId(Long id) {
        if (id == null) return null;
        Personnel p = new Personnel();
        p.setIdPer(id);
        return p;
    }
}