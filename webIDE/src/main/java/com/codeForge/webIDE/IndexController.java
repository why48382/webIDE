package com.codeForge.webIDE;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {
    @GetMapping("home")
    String home() {
        return "home.html";
    }

    @GetMapping("index")
    String index() {
        return "index.html";
    }
}
