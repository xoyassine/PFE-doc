package com.pfe.reservation.PFE.Service;

import com.pfe.reservation.PFE.DTO.AuthDTO;

public interface AuthService {
    void register( AuthDTO.RegisterRequest registerRequest) ;
    AuthDTO.LoginResponse login(AuthDTO.LoginRequest loginRequest) ;
    boolean updateProfile( AuthDTO.UpdateInput updateInput) ;
}
