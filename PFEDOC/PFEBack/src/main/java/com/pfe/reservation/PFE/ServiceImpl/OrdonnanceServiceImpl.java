package com.pfe.reservation.PFE.ServiceImpl;

import com.pfe.reservation.PFE.DTO.OrdonnanceDTO;
import com.pfe.reservation.PFE.Exception.ElementIntouvable;
import com.pfe.reservation.PFE.Exception.ElementNull;
import com.pfe.reservation.PFE.Mapper.OrdonnanceMapper;
import com.pfe.reservation.PFE.Model.Ordonnance;
import com.pfe.reservation.PFE.Repository.ConsultationRepository;
import com.pfe.reservation.PFE.Repository.OrdonnanceRepository;
import com.pfe.reservation.PFE.Service.OrdonnanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class OrdonnanceServiceImpl implements OrdonnanceService {

    private final OrdonnanceRepository ordonnanceRepository;
    private final ConsultationRepository consultationRepository;
    private final OrdonnanceMapper ordonnanceMapper;

    @Override
    @Transactional(readOnly = true)
    public List<OrdonnanceDTO.Output> getAllOrdonnances() {
        return ordonnanceRepository.findAll()
                .stream()
                .map(ordonnanceMapper::toOutput)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public OrdonnanceDTO.Output getOrdonnanceById(Long id) {
        if (id == null) throw new ElementNull("id is null");
        Ordonnance ordonnance = ordonnanceRepository.findById(id)
                .orElseThrow(() -> new ElementIntouvable("Ordonnance not found with id: " + id));
        return ordonnanceMapper.toOutput(ordonnance);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrdonnanceDTO.Output> getOrdonnancesByConsultationId(Long consultationId) {
        if (consultationId == null) throw new ElementNull("consultationId is null");
        return ordonnanceRepository.findByConsultation_IdConsultation(consultationId)
                .stream()
                .map(ordonnanceMapper::toOutput)
                .collect(Collectors.toList());
    }

    @Override
    public OrdonnanceDTO.Output createOrdonnance(OrdonnanceDTO.CreateInput input) {
        if (input == null) throw new ElementNull("input is null");

        if (!consultationRepository.existsById(input.getConsultationId())) {
            throw new ElementIntouvable("Consultation not found with id: " + input.getConsultationId());
        }

        Ordonnance ordonnance = ordonnanceMapper.toEntity(input);
        ordonnance = ordonnanceRepository.save(ordonnance);
        return ordonnanceMapper.toOutput(ordonnance);
    }

    @Override
    public OrdonnanceDTO.Output updateOrdonnance(Long id, OrdonnanceDTO.UpdateInput input) {
        if (id == null || input == null) throw new ElementNull("id or input is null");

        Ordonnance existing = ordonnanceRepository.findById(id)
                .orElseThrow(() -> new ElementIntouvable("Ordonnance not found with id: " + id));

        if (input.getConsultationId() != null && !consultationRepository.existsById(input.getConsultationId())) {
            throw new ElementIntouvable("Consultation not found with id: " + input.getConsultationId());
        }

        ordonnanceMapper.updateEntityFromDto(input, existing);
        existing = ordonnanceRepository.save(existing);
        return ordonnanceMapper.toOutput(existing);
    }

    @Override
    public void deleteOrdonnance(Long id) {
        if (id == null) throw new ElementNull("id is null");
        if (!ordonnanceRepository.existsById(id)) {
            throw new ElementIntouvable("Ordonnance not found with id: " + id);
        }
        ordonnanceRepository.deleteById(id);
    }
}