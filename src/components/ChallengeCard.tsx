
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Challenge, ChallengeLevel } from "@/utils/types";
import { Link } from "react-router-dom";

interface ChallengeCardProps {
  challenge: Challenge;
  featured?: boolean;
}

const getLevelColor = (level: ChallengeLevel) => {
  switch (level) {
    case ChallengeLevel.BEGINNER:
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case ChallengeLevel.INTERMEDIATE:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case ChallengeLevel.ADVANCED:
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
    case ChallengeLevel.EXPERT:
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, featured = false }) => {
  const levelColorClass = getLevelColor(challenge.level);
  
  return (
    <Link to={`/challenge/${challenge.id}`}>
      <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md ${featured ? 'border-cadarena-500 dark:border-cadarena-400' : ''}`}>
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          <div className={`absolute top-2 right-2 rounded-full px-2 py-0.5 text-xs font-medium ${levelColorClass}`}>
            {challenge.level.charAt(0).toUpperCase() + challenge.level.slice(1)}
          </div>
          {featured && (
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="bg-cadarena-500 text-white dark:bg-cadarena-400 dark:text-gray-900">
                Featured
              </Badge>
            </div>
          )}
          <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="h-20 w-20 rounded bg-cadarena-200 dark:bg-cadarena-800 flex items-center justify-center">
              <div className="text-cadarena-500 dark:text-cadarena-300 font-bold text-lg">CAD</div>
            </div>
          </div>
        </div>
        <CardHeader className="p-4">
          <h3 className="font-bold text-lg truncate">{challenge.title}</h3>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{challenge.description}</p>
        </CardContent>
        <CardFooter className="p-4 border-t flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {challenge.submissionCount} submissions
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {challenge.successRate}% success rate
            </span>
          </div>
          <div>
            <Badge variant="outline" className="bg-cadarena-50 text-cadarena-700 border-cadarena-200 dark:bg-cadarena-950 dark:text-cadarena-300 dark:border-cadarena-800">
              {challenge.points} pts
            </Badge>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ChallengeCard;
