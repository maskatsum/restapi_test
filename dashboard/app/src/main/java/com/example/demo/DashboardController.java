package com.example.demo;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;

@Controller
@RequestMapping("/dashboard")
public class DashboardController {

    @GetMapping
    public ModelAndView dashboard(ModelAndView modelView) {
        // ログインに成功したユーザー情報を取得する
        OidcUser user = (OidcUser)UserUtil.getPrincipal();
        Map<String, Object> attr = user.getAttributes();
        modelView.setViewName("dashboard/index");
        modelView.addObject("profile", attr);

        return modelView;
    }
}
