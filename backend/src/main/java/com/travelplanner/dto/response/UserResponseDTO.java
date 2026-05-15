package com.travelplanner.dto.response;

public class UserResponseDTO {

    private Long id;
    private String nama;
    private String email;
    private String fotoProfil;
    private String role;

    public UserResponseDTO() {}

    public UserResponseDTO(Long id, String nama, String email, String fotoProfil, String role) {
        this.id = id;
        this.nama = nama;
        this.email = email;
        this.fotoProfil = fotoProfil;
        this.role = role;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNama() { return nama; }
    public void setNama(String nama) { this.nama = nama; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFotoProfil() { return fotoProfil; }
    public void setFotoProfil(String fotoProfil) { this.fotoProfil = fotoProfil; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}