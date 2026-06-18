package com.pfe.reservation.PFE.Mapper;

import com.pfe.reservation.PFE.DTO.ConsultationDTO;
import com.pfe.reservation.PFE.Model.Consultation;
import com.pfe.reservation.PFE.Model.Patient;
import com.pfe.reservation.PFE.Model.Personnel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface ConsultationMapper {

    @Mapping(source = "patient.idPatient", target = "patientId")
    @Mapping(source = "patient.nom", target = "patientNom")
    @Mapping(source = "medecin.idPer", target = "medecinId")
    @Mapping(source = "medecin.nom", target = "medecinNom")
    ConsultationDTO.Output toOutput(Consultation entity);

    @Mapping(target = "idConsultation", ignore = true)
    @Mapping(target = "patient", source = "patientId", qualifiedByName = "patientFromId")
    @Mapping(target = "medecin", source = "medecinId", qualifiedByName = "medecinFromId")
    @Mapping(target = "ordonnances", ignore = true)
    Consultation toEntity(ConsultationDTO.CreateInput input);

    @Mapping(target = "idConsultation", ignore = true)
    @Mapping(target = "patient", source = "patientId", qualifiedByName = "patientFromId",
            conditionExpression = "java(input.getPatientId() != null)")
    @Mapping(target = "medecin", source = "medecinId", qualifiedByName = "medecinFromId",
            conditionExpression = "java(input.getMedecinId() != null)")
    @Mapping(target = "ordonnances", ignore = true)
    void updateEntityFromDto(ConsultationDTO.UpdateInput input, @MappingTarget Consultation entity);

    @Named("patientFromId")
    default Patient patientFromId(Long id) {
        if (id == null) return null;
        Patient p = new Patient();
        p.setIdPatient(id);
        return p;
    }

    @Named("medecinFromId")
    default Personnel medecinFromId(Long id) {
        if (id == null) return null;
        Personnel p = new Personnel();
        p.setIdPer(id);
        return p;
    }
}