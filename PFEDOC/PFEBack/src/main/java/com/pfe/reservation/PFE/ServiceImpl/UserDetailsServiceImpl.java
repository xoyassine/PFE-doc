package com.pfe.reservation.PFE.ServiceImpl;

import com.pfe.reservation.PFE.Model.Patient;
import com.pfe.reservation.PFE.Model.Personnel;
import com.pfe.reservation.PFE.Repository.PatientRepository;
import com.pfe.reservation.PFE.Repository.PersonnelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final PatientRepository patientRepository;
    private final PersonnelRepository personnelRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Patient> patient = patientRepository.getByEmail(email) ;
        if(patient.isPresent()) {
            Patient p = patient.get();
            return User.builder()
                    .username(p.getEmail())
                    .password(p.getPassword())
                    .roles("PATIENT")
                    .build();
        }

        Optional<Personnel> personnel =personnelRepository.getByEmail(email) ;
        if(personnel.isPresent()) {
            Personnel p = personnel.get();
            return User.builder()
                    .username(p.getEmail())
                    .password(p.getPassword())
                    .roles("PERSONNEL")
                    .build();
        }
        throw new UsernameNotFoundException("Aucun utilisateur trouvé avec l'email : " + email);
    }
}
