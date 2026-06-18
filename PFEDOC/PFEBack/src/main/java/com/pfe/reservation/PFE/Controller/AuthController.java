package com.pfe.reservation.PFE.Controller;

import com.pfe.reservation.PFE.DTO.AuthDTO;
import com.pfe.reservation.PFE.Service.AuthService;
import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public AuthDTO.LoginResponse login(@RequestBody @Valid AuthDTO.LoginRequest loginRequest ) {
        return authService.login(loginRequest);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody @Valid AuthDTO.RegisterRequest registerRequest ) {
        authService.register(registerRequest);
    }

}
