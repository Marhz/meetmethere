import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CommentService } from '../comment/comment.service';
import { AlertService } from '../../alert/alert.service';
import { AuthService } from '../../services/auth.service';

import { Comment } from "../comment/comment.model";

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.scss']
})
export class CommentsFormComponent implements OnInit {

	@Input() content: string;
	@Input() eventId: number;
  @Input() comment: Comment;
  @Output() newComment = new EventEmitter<Comment>();
  private edit: boolean = false;

  constructor(
    private commentService: CommentService,
    private alertService: AlertService,
    private authService: AuthService
   ) { }

  ngOnInit() {
  	if(this.content === undefined) {
  		this.content = "";
  	}
    if(this.comment !== undefined) {
      this.edit = true;
      this.content = this.comment.content;
    }
  }

  submit() {
    if(this.edit)
      this.submitEditComment();
    else
      this.submitNewComment();
  }

  submitNewComment() {
    this.commentService.submitComment(this.content, this.eventId)
      .then(res => {
        this.alertService.show(res.message);
        const comment: Comment = res.data;
        this.newComment.emit(comment);
        this.content = "";
      })
  }

  submitEditComment() {
    this.commentService.editComment(this.content, this.comment.id)
      .then(res => {
        this.alertService.show(res.message);
        this.comment.content = this.content;
      })
      .catch(err => {})
  }
}
