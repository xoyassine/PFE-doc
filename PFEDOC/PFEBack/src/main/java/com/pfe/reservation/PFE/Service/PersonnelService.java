package com.pfe.reservation.PFE.Service;

import com.pfe.reservation.PFE.DTO.PersonnelDTO;
import java.util.List;

public interface PersonnelService {
    List<PersonnelDTO.Output> getAllPersonnel();
    PersonnelDTO.Output getPersonnelById(Long id);
    PersonnelDTO.Output createPersonnel(PersonnelDTO.CreateInput input);
    PersonnelDTO.Output updatePersonnel(Long id, PersonnelDTO.UpdateInput input);
    void deletePersonnel(Long id);
}