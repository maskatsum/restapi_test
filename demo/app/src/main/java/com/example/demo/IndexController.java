package com.example.demo;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class IndexController {
    
    @GetMapping("/dashboard")
    public ModelAndView index() {
        ModelAndView result = new ModelAndView("dashboard");

        // Get a successful user login
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = securityContext.getAuthentication();
        OAuth2User user = (OAuth2User) authentication.getPrincipal();
        
        Map<String, Object> attr = user.getAttributes();
        HashMap<String, String> userData = new HashMap<>();
        for (String key : attr.keySet()) {
            userData.put(key, attr.get(key).toString());
        }
        result.addObject("userData", userData);
        
        return result;
    }

    @GetMapping("/")
    public ModelAndView home() {
        return new ModelAndView("home");
    }
}
