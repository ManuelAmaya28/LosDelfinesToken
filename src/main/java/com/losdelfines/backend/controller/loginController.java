package com.losdelfines.backend.controller;

import java.util.Calendar;
import java.util.Date;

import javax.servlet.ServletException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.losdelfines.backend.config.JwtFilter;
import com.losdelfines.backend.models.Token;
import com.losdelfines.backend.models.Usuarios;
import com.losdelfines.backend.services.UsuariosServices;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@RequestMapping(path = "/login/")
public class loginController {

	private final UsuariosServices usuariosServices;
	
	@Autowired
	public loginController(UsuariosServices usuariosServices) {
		this.usuariosServices = usuariosServices;
	}//constructor


	@PostMapping
	public Token loginUsuario(@RequestBody Usuarios usuario) throws ServletException {
		
		if(usuariosServices.validateUsuario(usuario)) {
			return new Token(generateToken(usuario.getCorreo()));
		}//if validateUsuario
		throw new ServletException("Nombre de usuario o contraseña incorrectos");
	}// loginUsuario

	
	private String generateToken(String username) {
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.HOUR, 10);
		return Jwts.builder().setSubject(username).claim("role", "user").setIssuedAt(new Date()).setExpiration(calendar.getTime()).signWith(SignatureAlgorithm.HS256, JwtFilter.secret).compact();		
	}//generateToken
	
	
}// class loginController