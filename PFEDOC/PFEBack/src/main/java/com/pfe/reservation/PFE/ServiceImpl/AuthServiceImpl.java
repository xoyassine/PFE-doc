package com.pfe.reservation.PFE.ServiceImpl;

import com.pfe.reservation.PFE.DTO.AuthDTO;
import com.pfe.reservation.PFE.Exception.ResourceNotFoundException;
import com.pfe.reservation.PFE.Model.Patient;
import com.pfe.reservation.PFE.Model.Personnel;
import com.pfe.reservation.PFE.Repository.PatientRepository;
import com.pfe.reservation.PFE.Repository.PersonnelRepository;
import com.pfe.reservation.PFE.Security.JwtService;
import com.pfe.reservation.PFE.Service.AuthService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {
    private final PersonnelRepository personnelRepository;
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    @Override
    public void register(AuthDTO.RegisterRequest registerRequest) {
        if( registerRequest == null ){
            throw new ResourceNotFoundException(" les donnees inserer sont null ");
        }

        if( registerRequest.getRole().equals("PERSONNEL") ){
            if( !personnelRepository.existsByEmail(registerRequest.getEmail())){
                Personnel personnel = new Personnel();
                personnel.setEmail(registerRequest.getEmail());
                personnel.setNom(registerRequest.getNom());
                personnel.setPrenom(registerRequest.getPrenom());
                personnel.setPassword( passwordEncoder.encode(registerRequest.getPassword()) );
                personnelRepository.save( personnel );
            }
        }else {
            if( !patientRepository.existsByEmail(registerRequest.getEmail()) ){
                Patient patient = new Patient();
                patient.setEmail(registerRequest.getEmail());
                patient.setNom(registerRequest.getNom());
                patient.setPrenom(registerRequest.getPrenom());
                patient.setPassword( passwordEncoder.encode(registerRequest.getPassword()) );
                patientRepository.save( patient );
            }
        }

    }

    @Override
    public AuthDTO.LoginResponse login(AuthDTO.LoginRequest loginRequest) {
        if( loginRequest == null ){
            throw new ResourceNotFoundException(" email ou mdp sont null ");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail() , loginRequest.getPassword()
                )
        );

        String token = jwtService.generateToken(loginRequest.getEmail());
        Personnel personnel = personnelRepository.findByEmail(loginRequest.getEmail()).orElse(null);
        Patient patient = patientRepository.findByEmail(loginRequest.getEmail()).orElse(null);

        if( personnel != null  ){
            return new AuthDTO.LoginResponse(
                    token ,
                    personnel.getIdPer() ,
                    "PERSONNEL",
                    personnel.getEmail() ,
                    personnel.getNom() ,
                    personnel.getPrenom()
            );

        }else {
            return new AuthDTO.LoginResponse(
                    token ,
                    patient.getIdPatient(),
                    "PATIENT",
                    patient.getEmail() ,
                    patient.getNom() ,
                    patient.getPrenom()
            );
        }

    }

    @Override
    public boolean updateProfile(AuthDTO.UpdateInput updateInput) {
        return false;
    }
}
