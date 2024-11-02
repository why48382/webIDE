package com.codeForge.webIDE;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
public class IndexController {
    @Autowired
    private FileRepository fileRepository;

    @GetMapping("home")
    String home() {
        return "home.html";
    }

    @GetMapping("index")
    String index() {
        return "index.html";
    }

    @PostMapping("/save")
    String save(@RequestBody String code) {
        File file = new File();
        file.setId(2l);
        file.data = code;
        System.out.println(file);

        try {
            fileRepository.save(file);
        }catch (Exception e) {
            System.out.println(e.getMessage());
            return "redirect:/error";
        }
        System.out.println("전송성공");
        return "redirect:/index";
    }
}
