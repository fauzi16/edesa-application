package com.edesa.controller.standard.dtpl.usecase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.edesa.controller.standard.dtpl.BaseController;
import com.edesa.controller.standard.dtpl.usecase.model.CommentIssueInfo;
import com.edesa.controller.standard.dtpl.usecase.model.PenugasanLaporanInfo;
import com.edesa.controller.standard.dtpl.usecase.model.PostLaporanInfo;
import com.edesa.controller.standard.dtpl.usecase.model.WargaBuatLaporanInfo;
import com.edesa.model.dtpl.transaction.Issue;
import com.edesa.service.dtpl.usecase.UCIssueService;

@RestController
@CrossOrigin
@RequestMapping(value="/issue")
public class UCIssueController extends BaseController {

    @Autowired
    private UCIssueService service;

    @RequestMapping(value = "/add-comment", method = RequestMethod.POST)
    public Issue addComment(@RequestBody CommentIssueInfo commentIssueInfo) {
        return service.addComment(commentIssueInfo);
    }

    @RequestMapping(value = "/step1-buat-laporan-oleh-warga", method = RequestMethod.POST)
    public Issue step1BuatLaporanOlehWarga(@RequestBody WargaBuatLaporanInfo buatLaporanInfo) {
        return service.step1BuatLaporanOlehWarga(buatLaporanInfo);
    }

    @RequestMapping(value = "/step2-penugasan-laporan-oleh-admin", method = RequestMethod.POST)
    public Issue step2PenugasanLaporanOlehAdmin(@RequestBody PenugasanLaporanInfo penugasanLaporanInfo) {
        return service.step2PenugasanLaporanOlehAdmin(penugasanLaporanInfo);
    }

    @RequestMapping(value = "/step3-inprogress-laporan-oleh-petugas-desa", method = RequestMethod.POST)
    public Issue step3InProgressLaporanOlehPetugasDesa(@RequestBody PostLaporanInfo laporanInfo) {
        return service.step3InProgressLaporanOlehPetugasDesa(laporanInfo);
    }

    @RequestMapping(value = "/step4-done-laporan-oleh-perangkat-desa", method = RequestMethod.POST)
    public Issue step4CloseLaporanOlehPerangkatDesa(@RequestBody PostLaporanInfo laporanInfo) {
        return service.step4CloseLaporanOlehPerangkatDesa(laporanInfo);
    }

    @RequestMapping(value = "/step5-close-laporan-oleh-admin", method = RequestMethod.POST)
    public Issue step5CloseLaporanOlehAdmin(@RequestBody PostLaporanInfo laporanInfo) {
        return service.step5CloseLaporanOlehAdmin(laporanInfo);
    }
    
}
