package com.pfe.reservation.PFE.ServiceImpl;

import com.pfe.reservation.PFE.DTO.PersonnelDTO;
import com.pfe.reservation.PFE.Exception.ResourceNotFoundException;
import com.pfe.reservation.PFE.Mapper.PersonnelMapper;
import com.pfe.reservation.PFE.Model.Personnel;
import com.pfe.reservation.PFE.Repository.PersonnelRepository;
import com.pfe.reservation.PFE.Service.PersonnelService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PersonnelServiceImpl implements PersonnelService {

    private final PersonnelRepository personnelRepository;
    private final PersonnelMapper personnelMapper;

    public PersonnelServiceImpl(PersonnelRepository personnelRepository,
                                PersonnelMapper personnelMapper) {
        this.personnelRepository = personnelRepository;
        this.personnelMapper = personnelMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PersonnelDTO.Output> getAllPersonnel() {
        return personnelRepository.findAll()
                .stream()
                .map(personnelMapper::toOutput)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public PersonnelDTO.Output getPersonnelById(Long id) {
        Personnel personnel = personnelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Personnel not found with id: " + id));
        return personnelMapper.toOutput(personnel);
    }

    @Override
    public PersonnelDTO.Output createPersonnel(PersonnelDTO.CreateInput input) {
        Personnel personnel = personnelMapper.toEntity(input);
        Personnel saved = personnelRepository.save(personnel);
        return personnelMapper.toOutput(saved);
    }

    @Override
    public PersonnelDTO.Output updatePersonnel(Long id, PersonnelDTO.UpdateInput input) {
        Personnel existing = personnelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Personnel not found with id: " + id));

        personnelMapper.updateEntityFromDto(input, existing);
        Personnel updated = personnelRepository.save(existing);
        return personnelMapper.toOutput(updated);
    }

    @Override
    public void deletePersonnel(Long id) {
        if (!personnelRepository.existsById(id)) {
            throw new ResourceNotFoundException("Personnel not found with id: " + id);
        }
        personnelRepository.deleteById(id);
    }
}