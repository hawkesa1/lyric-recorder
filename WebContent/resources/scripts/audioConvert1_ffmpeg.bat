@echo off
ECHO Started Audio Convert Script 1

SET AUDIO_CONVERT_EXECUTABLE=%1
SET SOURCE_AUDIO_FILE=%2
SET TARGET_AUDIO_FILE=%3

ECHO %AUDIO_CONVERT_EXECUTABLE%
%AUDIO_CONVERT_EXECUTABLE% -y -i %SOURCE_AUDIO_FILE% %TARGET_AUDIO_FILE%
exit;