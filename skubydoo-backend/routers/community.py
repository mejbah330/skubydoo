from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from models.all_models import CommunityPost, DesignVote
from schemas.all_schemas import CommunityPostIn, CommunityPostOut, DesignVoteOut

router = APIRouter()


@router.get("/posts", response_model=list[CommunityPostOut])
def list_posts(limit: int = Query(50, le=100), offset: int = Query(0), db: Session = Depends(get_db)):
    posts = db.query(CommunityPost).filter(CommunityPost.is_approved == True).order_by(
        CommunityPost.upvotes.desc()
    ).offset(offset).limit(limit).all()
    return posts


@router.post("/posts", response_model=CommunityPostOut, status_code=201)
def create_post(payload: CommunityPostIn, db: Session = Depends(get_db)):
    post = CommunityPost(
        user_name=payload.user_name,
        user_email=payload.user_email,
        image_url=payload.image_url,
        caption=payload.caption,
        is_approved=False,
    )
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


@router.post("/posts/{post_id}/upvote")
def upvote_post(post_id: str, db: Session = Depends(get_db)):
    post = db.query(CommunityPost).filter(CommunityPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    post.upvotes += 1
    db.commit()
    return {"upvotes": post.upvotes, "downvotes": post.downvotes}


@router.post("/posts/{post_id}/downvote")
def downvote_post(post_id: str, db: Session = Depends(get_db)):
    post = db.query(CommunityPost).filter(CommunityPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    post.downvotes += 1
    db.commit()
    return {"upvotes": post.upvotes, "downvotes": post.downvotes}


@router.get("/designs", response_model=list[DesignVoteOut])
def list_design_votes(db: Session = Depends(get_db)):
    designs = db.query(DesignVote).filter(DesignVote.is_active == True).order_by(DesignVote.votes.desc()).all()
    return designs


@router.post("/designs/{design_id}/vote")
def vote_design(design_id: str, db: Session = Depends(get_db)):
    design = db.query(DesignVote).filter(DesignVote.id == design_id).first()
    if not design:
        raise HTTPException(status_code=404, detail="Design not found")
    design.votes += 1
    db.commit()
    return {"votes": design.votes}
