package com.pfe.reservation.PFE.Mapper;

import com.pfe.reservation.PFE.DTO.OrdonnanceDTO;
import com.pfe.reservation.PFE.Model.Consultation;
import com.pfe.reservation.PFE.Model.Ordonnance;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface OrdonnanceMapper {

    @Mapping(source = "consultation.idConsultation", target = "consultationId")
    OrdonnanceDTO.Output toOutput(Ordonnance entity);

    @Mapping(target = "idOrdonnance", ignore = true)
    @Mapping(target = "consultation", source = "consultationId", qualifiedByName = "consultationFromId")
    Ordonnance toEntity(OrdonnanceDTO.CreateInput input);

    @Mapping(target = "idOrdonnance", ignore = true)
    @Mapping(target = "consultation", source = "consultationId", qualifiedByName = "consultationFromId",
            conditionExpression = "java(input.getConsultationId() != null)")
    void updateEntityFromDto(OrdonnanceDTO.UpdateInput input, @MappingTarget Ordonnance entity);

    @Named("consultationFromId")
    default Consultation consultationFromId(Long id) {
        if (id == null) return null;
        Consultation c = new Consultation();
        c.setIdConsultation(id);
        return c;
    }
}