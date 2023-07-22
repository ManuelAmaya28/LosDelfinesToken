package com.losdelfines.backend.services;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.losdelfines.backend.models.CambioContrasena;
import com.losdelfines.backend.models.Usuarios;
import com.losdelfines.backend.repositories.UsuariosRepository;

@Service
public class UsuariosServices {
	
    private final UsuariosRepository usuariosRepository;
    
    @Autowired
	private PasswordEncoder passwordEncoder;

    @Autowired
    public UsuariosServices(UsuariosRepository usuariosRepository) {
    	this.usuariosRepository = usuariosRepository;
    }//constructor
    
    public List<Usuarios> getAllUsuarios(){
    	return usuariosRepository.findAll();	
    	}//getAllUsuarios
    
    public Usuarios getUsuarios(Long id) {
    	return usuariosRepository.findById(id).orElseThrow(
				()-> new IllegalArgumentException("Usuario con id " + id + " no existe.")
				);
    }//getUsuarios
    
    public Usuarios deleteUsuarios(Long id) {
    	Usuarios tmpUser=null;
    	if (usuariosRepository.existsById(id)) {
			tmpUser=usuariosRepository.findById(id).get();
			usuariosRepository.deleteById(id);
		}//if
		return tmpUser;
	}//deleteUsuarios

	public Usuarios addUsuarios(Usuarios usuarios) {
		Usuarios tmpUser=null;
		if(usuariosRepository.findByCorreo(usuarios.getCorreo()).isEmpty()) {
			
			usuarios.setContrasena(passwordEncoder.encode(usuarios.getContrasena()));
			
			tmpUser = usuariosRepository.save(usuarios);
		}//if
			return tmpUser;
	}//addUsuarios

	public Usuarios updateUsuarios(Long id, CambioContrasena cambioContrasena) {
		Usuarios tmpUser = null;
		if (usuariosRepository.existsById(id)) { // busca si existe
			if ( (cambioContrasena.getContrasena() !=null) && (cambioContrasena.getNewContrasena() !=null) ) { //passwords !null
				tmpUser=usuariosRepository.findById(id).get();
				
				if(passwordEncoder.matches(cambioContrasena.getContrasena(), tmpUser.getContrasena())) {//verifica si es igual
					tmpUser.setContrasena(passwordEncoder.encode(cambioContrasena.getNewContrasena()));
					usuariosRepository.save(tmpUser);
				}else {
					tmpUser=null;
				}//if equals
			}// !null
		}else {
			System.out.println("Update - El usuario con id " + id + " no existe." );
		}//else
		return tmpUser;
	}//updateUsuarios
	
	public boolean validateUsuario(Usuarios usuario) {
		Optional<Usuarios> userByEmail = usuariosRepository.findByCorreo(usuario.getCorreo());
		if (userByEmail.isPresent()) {
			Usuarios user = userByEmail.get();
			
			if (passwordEncoder.matches(usuario.getContrasena(), user.getContrasena())) {
//			if (user.getPassword().equals(usuario.getPassword())) {
				return true;
			} // if equals
		} // if isPresent
		return false;
	}// validateUsuario
    
}//class UsuariosServices