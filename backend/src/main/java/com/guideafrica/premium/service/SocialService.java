package com.guideafrica.premium.service;

import com.guideafrica.premium.model.SocialPost;
import com.guideafrica.premium.model.Utilisateur;
import com.guideafrica.premium.repository.SocialPostRepository;
import com.guideafrica.premium.repository.UtilisateurRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SocialService {
    private final SocialPostRepository postRepository;
    private final UtilisateurRepository utilisateurRepository;

    public SocialService(SocialPostRepository postRepository, UtilisateurRepository utilisateurRepository) {
        this.postRepository = postRepository;
        this.utilisateurRepository = utilisateurRepository;
    }

    public Page<SocialPost> getFeed(Pageable pageable) {
        return postRepository.findAllByOrderByDateCreationDesc(pageable);
    }

    @Transactional
    public SocialPost createPost(String contenu, String image, String userEmail) {
        Utilisateur user = utilisateurRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouve"));
        SocialPost post = new SocialPost();
        post.setContenu(contenu);
        post.setImage(image);
        post.setUtilisateur(user);
        return postRepository.save(post);
    }

    @Transactional
    public SocialPost likePost(Long postId) {
        SocialPost post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post non trouve"));
        post.setLikes(post.getLikes() + 1);
        return postRepository.save(post);
    }

    @Transactional
    public void deletePost(Long postId, String userEmail) {
        SocialPost post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post non trouve"));
        if (!post.getUtilisateur().getEmail().equals(userEmail)) {
            throw new RuntimeException("Non autorise");
        }
        postRepository.delete(post);
    }
}
