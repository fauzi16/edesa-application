package com.edesa.controller.usecase.registration;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.edesa.controller.CommonController;
import com.edesa.model.dtpl.master.User;

@RestController
@RequestMapping("/common")
public class UCCommonController extends CommonController {

	@Autowired
	private UCCommonService commonService;

	@RequestMapping(method = RequestMethod.GET, value = "/authenticated-user-info")
	public User userInfo(@RequestHeader Map<String, String> headers) {
		try {

			String tokenAuthorization = headers.get("authorization");
			String email = getUserNameFromHeader(tokenAuthorization);

			return commonService.userInfo(email);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error fetch entity", e);
		}
	}

	@RequestMapping(value = "static/image/{entity}/{entityId}/{imageSeq}", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
	public void getImage(HttpServletResponse response, @PathVariable("entity") String entity,
			@PathVariable("entityId") Long entityId, @PathVariable("imageSeq") Integer imageSeq) throws IOException {

		commonService.getImage(response, entity, entityId, imageSeq);
	}

	@RequestMapping(value = "static/image/add/{entity}/{entityId}", method = RequestMethod.POST)
	public void addImage(HttpServletResponse response, @PathVariable("entity") String entity,
			@PathVariable("entityId") Long entityId, @RequestBody List<String> imagesBase64) throws Exception {

		commonService.addImage(entity, entityId, imagesBase64);
	}

	@RequestMapping(value = "static/image/remove/{entity}/{entityId}/{imageSeq}", method = RequestMethod.DELETE)
	public void removeImage(HttpServletResponse response, @PathVariable("entity") String entity,
			@PathVariable("entityId") Long entityId, @PathVariable("imageSeq") Integer imageSeq) throws IOException {

		commonService.removeImage(entity, entityId, imageSeq);
	}

}
