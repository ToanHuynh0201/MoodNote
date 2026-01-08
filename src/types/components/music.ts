export interface PlaylistCardProps {
	title: string;
	artist: string;
	coverUrl?: string;
	onPress?: () => void;
	onLike?: () => void;
	onInfo?: () => void;
	onShare?: () => void;
	onPlay?: () => void;
	isLiked?: boolean;
}
