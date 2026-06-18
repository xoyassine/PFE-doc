package com.pfe.reservation.PFE.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    public String generateToken(String username){
        Map<String , Object> claims = new HashMap<>();
        return Jwts.builder()
                .claims(claims)
                .subject(username)
                .issuedAt( new Date(System.currentTimeMillis()))
                .expiration( new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith( getKey() )
                .compact() ;
    }

    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token) { return extractClaim(token,Claims::getSubject) ;}

    private <T> T extractClaim(String token , Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token) ;
        return claimsResolver.apply(claims) ;
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith( getKey() )
                .build()
                .parseClaimsJws(token)
                .getPayload() ;
    }

    public boolean validateToken(String jwtToken , UserDetails userDetails) {
        final String username = extractUsername(jwtToken);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(jwtToken));
    }
    public boolean isTokenExpired(String token) { return extractExpiration(token).before( new Date()) ;}

    public Date extractExpiration(String token) { return extractClaim(token,Claims::getExpiration) ;}

}
