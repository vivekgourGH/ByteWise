package com.cabconnect.backend.controller;

import com.cabconnect.backend.dto.MessageResponse;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/all")
    public MessageResponse allAccess() {
        return new MessageResponse("Public Content.");
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN') or hasRole('DRIVER')")
    public MessageResponse userAccess() {
        return new MessageResponse("User Content.");
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public MessageResponse adminAccess() {
        return new MessageResponse("Admin Board.");
    }

    @GetMapping("/driver")
    @PreAuthorize("hasRole('DRIVER')")
    public MessageResponse driverAccess() {
        return new MessageResponse("Driver Board.");
    }
}

